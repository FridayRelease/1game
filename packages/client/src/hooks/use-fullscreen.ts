type anotherFunction = (isActive: boolean) => void;

const useFullscreen = () => {

  const activateFullscreen = (changeStateFunc: anotherFunction) => {
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      changeStateFunc(true)
    }
  };

  const deactivateFullscreen = (changeStateFunc: anotherFunction) => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      changeStateFunc(false)
    }
  };

  return {
    activateFullscreen,
    deactivateFullscreen
  }
}

export default useFullscreen;
