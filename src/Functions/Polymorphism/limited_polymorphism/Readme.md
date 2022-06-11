# Ограниченный полиморфизм

```typescript
  type TreeNode = {
    value: string
  }
  type LeefNode = TreeNode & {
    isLeaf: true
  }
  type InnerNode = TreeNode & {
    childrem: [TreeNode] | [TreeNode, TreeNode]
  }
```
При написании функции, которая взаимодействует с общим свойством,
нужно учитывать тот момент, что все наследуется от TreeNode, если 
не учесть этот момент и опустить определение зависимости, то будет
ошибка (т.к. нельзя безопасно прочиатть node.value). При этом, если
просто указать тип TreeNode, то остальные свойство обрежутся.
```typescript
  fucntion mapNode<T extends TreeNode>(
  	node: T,
  	f: (value: string) => string
  ): T {
  	return {
  		...node,
  		value: f(node.value)
  	}
  }
```

## Несколько ограничений

Если нужно сделать несколько ограничений, то слежует использовать
расширение пересечения.

```typescript
  type HasSides = {numberOfSides: number}
  type SidesHaveLength = {sideLength: number}

  function logPerimeter<
  	Shape extends HasSides & SidesHaveLength
  	>(s: Shape): Shape {
  	console.log(s.numberOfSides * s.sideLength)
  	return s
  }

  type Square = HasSides & SidesHaveLength
  let square: Square = {numberOfSides: 4, sideLength: 3}
  logPerimetr(square)
```