import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

/**
 * Node for to-do item
 */
export class TreeItemNode {
  id: string;
  children: TreeItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TreeItemFlatNode {
  id: string;
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = [{
  Applications: {
    Calendar: 'app',
    Chrome: 'app',
    Webstorm: 'app'
  },
  Documents: {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    material2: {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  Downloads: {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  Pictures: {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
}];

@Injectable()
export class MstreeService {
  dataChange = new BehaviorSubject<TreeItemNode[]>([]);
  treeData: any;
  get data(): TreeItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // this.treeData =  TREE_DATA;

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA[0], '0');
    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */

  buildFileTree(obj: object, level: string, parentId: string = '0'): TreeItemNode[] {
    return Object.keys(obj).reduce<TreeItemNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new TreeItemNode();
      node.item = key;
      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }


  buildFromFlatTree(obj: any[], level: string): TreeItemNode[] {
    return obj.filter(o =>
      (o.id).startsWith(level + '/')
      && (o.id.match(/\//g) || []).length === (level.match(/\//g) || []).length + 1
    )
      .map(o => {
        const node = new TreeItemNode();
        node.item = o.item;
        node.id = o.id;
        let children = obj.filter(so => (so.id).startsWith(level + '/'));
        children = _.uniqBy(children, e => e.id);
        if (children && children.length > 0) {
          node.children = this.buildFromFlatTree(children, o.id);
        }
        return node;
      });
  }

  public filter(flatTree, filterText: string) {
    let filteredTreeData;
    if (filterText) {
      filteredTreeData = flatTree.filter(d => d.item.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1);
      Object.assign([], filteredTreeData).forEach(ftd => {
        let str = (ftd.id as string);
        while (str.lastIndexOf('/') > -1) {
          const index = str.lastIndexOf('/');
          str = str.substring(0, index);
          if (filteredTreeData.findIndex(t => t.id === str) === -1) {
            const obj = flatTree.find(d => d.id === str);
            if (obj) {
              filteredTreeData.push(obj);
            }
          }
        }
      });
    } else {
      filteredTreeData = flatTree;
    }

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    // file node as children.
    let data = this.buildFromFlatTree(filteredTreeData, '0');
    // // Notify the change.
    data = _.uniqBy(data, e => e.id);
    this.dataChange.next(data);
  }

}
