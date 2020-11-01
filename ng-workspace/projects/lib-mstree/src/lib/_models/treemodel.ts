
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

// Dummy Static Data

/**
 * The Json object for to-do list data.
 */
export const TREE_DATA = [{
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

