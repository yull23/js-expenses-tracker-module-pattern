// Store
const idGenerator = (function () {
  let id = 0;
  return {
    next() {
      return id++;
    },
  };
})();

// Se crea Store
const Store = (function () {
  const initialExpenses = [
    {
      id: idGenerator.next(),
      category: "shopping",
      description: "nintendo",
      amount: "500",
    },
    {
      id: idGenerator.next(),
      category: "shopping",
      description: "tequila",
      amount: "100",
    },
    {
      id: idGenerator.next(),
      category: "shopping",
      description: "tequila",
      amount: "100",
    },
    {
      id: idGenerator.next(),
      category: "shopping",
      description: "tequila",
      amount: "100",
    },
  ];

  // Retorna este objeto y nos olvidamos de Initial Expenses
  return {
    expenses: JSON.parse(localStorage.getItem("expenses")) || initialExpenses,
    addExpense(newExpense) {
      this.expenses.push(newExpense);
      localStorage.setItem("expenses", JSON.stringify(this.expenses));
    },
    removeExpense(id) {
      const indexRemove = Store.expenses.findIndex(
        (expense) => expense.id == id
      );
      this.expenses.splice(indexRemove, 1);
      localStorage.setItem("expenses", JSON.stringify(this.expenses));
    },
  };
})();

// Se crea el load para cargar modulos al DOM
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

// Create the module, which returns an object with two elements
// The first element is toString() = returns the html structure in a string
// The second element is addListeners() = when executed it creates events related to the module

// Header
const Header = (function () {
  const template = `
    <header class="header f">
      <div class="nav f">
        <h1 class="header__title upc">
          <a href="index.html" class="pl-100">expenses tracker</a>
        </h1>
        <nav class="navbar js-navbar">
          <ul class="navbar__list">
            <li class="navbar__item f-cc">
              <a class="navbar__link" href="index.html">list expenses</a>
            </li>
            <li class="navbar__item f-cc">
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
    </header>
    `;
  const handlerClick = function () {
    const navMenu = document.querySelector(".js-navmenu");
    const navBar = document.querySelector(".js-navbar");
    const main = document.querySelector(".js-main");

    navMenu.addEventListener("click", (event) => {
      navMenu.classList.toggle("navmenu-open");
      navBar.classList.toggle("navmenu-open");
      main.classList.toggle("section");
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
})();

const ExpenseView = (function () {
  // ♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫
  const renderExpense = function (expense) {
    return `
    <div class="expense f br-050 plr-150 ptb-075 js-expense">
      <div class="expense__description f fd-c w-100">
        <span class="expense__type fw-bold">${expense.category}</span>
        <span class="expense__product">${expense.description}</span>
      </div>
      <span class="expense__price f-cc">$${expense.amount}</span>
      <a href="#" class="expense__action f-cc fw-bold js-delete-expense" data-id=${expense.id}>delete</a>
    </div>
    `;
  };
  // ♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫
  const clickDelete = function () {
    const expenses = document.querySelector(".js-expenses");
    expenses.addEventListener("click", (event) => {
      event.preventDefault();
      if (event.target.classList.contains("js-delete-expense")) {
        Store.removeExpense(event.target.dataset.id);
      }
      Main.load(ExpenseView);
    });
  };

  const buttonAdd = function () {};

  // ♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫
  const template = () =>
    `<div class="expenses f fd-c js-expenses">
      ${Store.expenses.map((element) => renderExpense(element)).join("")}
    </div>
    <a href="#" class="expenses-new__link f-cc mtb-100 br-030 " id="js-button-add"
    >add new expense</a`;

  // return ♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫♫
  return {
    toString() {
      return template();
    },
    addListeners() {
      clickDelete();
    },
  };
})();

const forExpense = function (label, type = "text") {
  return `
  <div class="form-expense__field">
    <label for="${label}" class="form-expense__label">${label}</label>
    <input type="${type}" class="form-expense__input" />
  </div>
  `;
};

const Layaout = (function () {
  const template = `
  ${Header}
  <main class="main container-md mt-075 js-main">
    <section class="expenselist js-expenselist">
    </section>
  </main>
  `;
  return {
    toString() {
      return template;
    },
    addListeners() {
      Header.addListeners();
    },
  };
})();

const App = DOMHandler("#root");
App.load(Layaout);

const Main = DOMHandler(".js-expenselist");
// Main.load(ExpenseView);
