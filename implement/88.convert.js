// 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

// 原始 list 如下
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 },
];

/*
转换后的结果如下
let result = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3,
          },
          {
            id: 16,
            name: '部门L',
            parentId: 3,
          },
        ],
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4,
          },
        ],
      },
    ],
  },
  ...
]; */

// 1
function convert(list) {
  var map = {};
  return list.reduce((total, current) => {
    map[current.id] = current;
    if (current.parentId === 0) {
      total.push(current);
    } else {
      var parent = map[current.parentId];
      if (!parent.children) parent.children = [];
      parent.children.push(current);
    }
    return total;
  }, []);
}

console.log(JSON.stringify(convert(list)));
