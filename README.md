# ms-deplpy

本地代码自动化发布至服务器

## install
```
npm i @masonjs/deploy -D
```

## Examples

```js
// 使用示例
const SERVER_LIST = [
  {
    name: "Server 1",
    host: "example.com",
    port: 22,
    username: "user",
    password: "pass",
    path: "/path/to/deploy",
    dist: "dist/",
    del: ["/path/to/delete1", "/path/to/delete2"],
    url: "http://example.com",
  },
  {
    name: "Server 2",
    host: "example2.com",
    port: 22,
    username: "user",
    password: "pass",
    path: "/path/to/deploy",
    dist: "dist/",
    del: ["/path/to/delete1"],
    url: "http://example2.com",
  },
];
```