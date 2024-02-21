import Button, { BorderRadius } from './components/shared/button/Button';

function App() {
  const handleClick = () => {
    console.log('Button was clicked!');
  };

  return (
    <>
      <h1 className="underline text-rose-500 text-h1 text-center bg-imos-deep-blue p-4">Hello world!</h1>
      <Button
        onClick={handleClick}
        borderColor={'border-rose-300'}
        color={'text-imos-deep-blue'}
        backgroundColor={'bg-black'}
        borderRadius={BorderRadius.Medium}
        hasIcon={false}
      >
        Click Me
      </Button>
    </>
  );
}

export default App;
