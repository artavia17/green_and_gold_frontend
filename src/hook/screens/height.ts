let heightHeader: number = 0;
let heightScreen: number = 0;
let newHeightMain: number = 0;
let header: HTMLElement | null = null;

function SreeenHeight() {
    
    if (typeof document !== 'undefined') {

    header = document.querySelector('header');

    if (header) {
      heightHeader = header.offsetHeight;
      heightScreen = window.innerHeight;
      newHeightMain = heightScreen - heightHeader;
    }
  }

  return newHeightMain;
}

export default SreeenHeight;
