import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './App.css';

function App() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      history.push("/registros")
    }
  }, [isLoading, history])

  const handleClick = () => setIsLoading(true)

  return (
    <Card body className="text-center">
      <h1>Manga Rosa</h1>

      <Button
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        Registros
      </Button>
    </Card>
  );
}

export default App;
