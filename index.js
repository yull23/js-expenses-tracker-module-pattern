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
// console.log(App);
// App.load("<h1>Hi</h1>");

const createHeader = function () {
  const template = "<h1>Header</h1>";
  const handlerClick = function () {
    const title = document.querySelector("h1");
    title.addEventListener("click", (event) => {
      console.log("click");
    });
  };
  // Retorna un objeto
  // Retorna un objeto
  // Retorna un objeto
  // Retorna un objeto
  // Retorna un objeto
  return {
    toString() {
      return template;
    },
    addListeners() {
      handlerClick();
    },
  };
  // return {
  //   render() {
  //     return template;
  //   },
  // };
};

const header = createHeader();
// Sobrescribe
// App.load(header.render());
App.load(header);
