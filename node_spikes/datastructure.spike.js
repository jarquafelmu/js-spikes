// directories are nodes on a tree, files are leaves
let base = {
    'name': '',
    'path': '',
    'size': {
        'raw': '',
        'metric': ''
    },
    'blockInfo': {
        'blksize': 0,
        'blocks': 0
    }
};

let directory = { // same as base with the addtion of a childrens array
    'children': [] // can be other directories or other files
}
