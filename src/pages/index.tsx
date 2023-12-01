import { ReactNode, useState } from 'react';
interface test1 {
  title: string;
  isFruit: boolean;
  id: number;
}

function MyButton({ onClick }: { onClick: () => void }): ReactNode {
  return (
    <button onClick={onClick}>
      I'm a button
    </button>
  );
}

const products: test1[] = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

function ListFunc(): ReactNode {
  const res: ReactNode = products.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
  );
  return (
    <ul>{res}</ul>
  );
}

export default function MyApp() {
  let content: String;
  let [isLogin, setIsLogin] = useState(true);
  function change(): void {
    setIsLogin(!isLogin);
  }
  if (isLogin) {
    content = "ttest";
  } else {
    content = "aaaa";
  }

  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton onClick={change} />
      <ListFunc />
      <h1>{content}</h1>
    </div>
  );
}