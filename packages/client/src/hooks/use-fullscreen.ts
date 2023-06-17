const useFullscreen = () => {

  const activateFullscreen = () => {
    console.log(document.fullscreenElement);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };

  const deactivateFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return {
    activateFullscreen,
    deactivateFullscreen
  }
}

export default useFullscreen;
