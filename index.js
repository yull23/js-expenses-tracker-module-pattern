const DOMHandler = function (parentSelector) {
  const parent = document.querySelector(parentSelector);
  if (!parent) throw new Error("Parent not found");
  return {
    // Se carga mediante:
    // const App = DOMHandler("#root");
    // App.load(module);
    load(module) {
      // Load carga el string HTML de module a parent
      parent.innerHTML = module;
      // Load activa los eventos que contiene el module
      module.addListeners();
    },
  };
};

const App = DOMHandler("#root");

// Create the Header module, which returns an object with two elements
// The first element is toString() = returns the html structure in a string
// The second element is addListeners() = when executed it creates events related to the module

const createHeader = function () {
  const template = `
    <header class="header flex">
      <div class="nav flex">
        <h1 class="header__title upc">
          <a href="index.html" class="pl-100">expenses tracker</a>
        </h1>
        <nav class="navbar js-navbar">
          <ul class="navbar__list">
            <li class="navbar__item flex-cc">
              <a class="navbar__link" href="index.html">list expenses</a>
            </li>
            <li class="navbar__item flex-cc">
              <a class="navbar__link" href="#">add expenses</a>
            </li>
          </ul>
        </nav>
        <div class="navmenu js-navmenu">
          <img
            src="/media/icons/menu.svg"
            alt="img"
            class="navmenu__icon navmenu__icon-open"
          />
          <img
            src="/media/icons/close.svg"
            alt="img"
            class="navmenu__icon navmenu__icon-close"
          />
        </div>
      </div>
    </header>`;
  const handlerClick = function () {
    const navMenu = document.querySelector(".js-navmenu");
    const navBar = document.querySelector(".js-navbar");

    navMenu.addEventListener("click", (event) => {
      navMenu.classList.toggle("navmenu-open");
      navBar.classList.toggle("navmenu-open");
    });
  };
  return {
    toString() {
      return template;
    },
    addListeners() {
      handlerClick();
    },
  };
};
const header = createHeader();
App.load(header);
