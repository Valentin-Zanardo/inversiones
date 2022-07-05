let addBag = document.querySelectorAll('.botonCompra');
let course = [
  {
    nombre: `Curso de Trading
        para principiantes`,
    carrito: 0,
    precio: 50,
  },
  {
    nombre: `Curso de Trading
        para intermedios`,
    carrito: 0,
    precio: 75,
  },
  {
    nombre: `Curso de Trading
        para avanzados`,
    carrito: 0,
    precio: 100,
  },
];

for (let i = 0; i < addBag.length; i++) {
  addBag[i].addEventListener('click', () => {
    totalItems(course[i]);
  });
  totalCost(course[i]);
}

function pageReload() {
  let productNumbers = localStorage.getItem('totalItems');
  if (productNumbers) {
    document.querySelector('.aCounter span').textContent = productNumbers;
  }
}

function totalItems(course) {
  let productNumbers = localStorage.getItem('totalItems');
  productNumbers = Number(productNumbers);
  productNumbers ? add() : notAdd();

  function add() {
    localStorage.setItem('totalItems', productNumbers + 1);
    document.querySelector('.aCounter span').textContent = productNumbers + 1;
  }

  function notAdd() {
    localStorage.setItem('totalItems', 1);
    document.querySelector('.aCounter span').textContent = 1;
  }

  setItems(course);
}

function setItems(course) {
  let bagItems = localStorage.getItem('courseInBag');
  bagItems = JSON.parse(bagItems);
  if (bagItems != null) {
    if (bagItems[course.nombre] == undefined) {
      bagItems = {
        ...bagItems,
        [course.nombre]: course,
      };
    }
    bagItems[course.nombre].carrito += 1;
  } else {
    course.carrito = 1;
    bagItems = {
      [course.nombre]: course,
    };
  }
  localStorage.setItem('courseInBag', JSON.stringify(bagItems));
}

function totalCost(course) {
  let courseCost = localStorage.getItem('totalCost');

  if (courseCost != null) {
    courseCost = Number(courseCost);
    localStorage.setItem('totalCost', courseCost + course.precio);
  } else {
    localStorage.setItem('totalCost', course.precio);
  }
}
console.log(
  localStorage.length == 1 ||
    'Su carrito no posee ningún articulo hasta el momento'
);
pageReload();
