import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [item, setItem] = React.useState<{
    title: string;
    imageUrl: string;
    price: number;
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62a3b22b5bd3609cee6ec0c3.mockapi.io/items/${pizzaId}`,
        );
        setItem(data);
      } catch (error) {
        alert('Ошибка при загрузки пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!item) {
    return <>Loading</>;
  }

  return (
    <div className="container">
      <h1>{item.title}</h1>
      <img src={item.imageUrl} />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic deleniti vero
        dolor accusamus tempore repellat placeat at necessitatibus. Ipsum commodi aut ullam voluptas
        rem odio quam natus optio iusto.
      </p>
      <h3>{item.price} ₽</h3>
    </div>
  );
};

export default FullPizza;
