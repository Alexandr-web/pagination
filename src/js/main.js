const pagination = () => {
  const url = 'https://jsonplaceholder.typicode.com/photos';
  const limit_data = 55;

  let total_blocks_on_page = 8;
  let active_page = 0;

  // Получение данных с сервера
  const getData = async(url) => {
    const res = await fetch(url);
    const data = await res.json();

    return data.slice(0, limit_data);
  }

  getData(url)
    .then(data => {
      generatePages(data);
      setPagination(data);
    })
    .catch(err => {
      throw err;
    });
    
  // Создание блоков в html
  function generateBlocks(data) {
    const list_blocks = document.querySelector('.wrapper__main-list');

    // Создание блоков
    data.map(item => {
      const block = `
      <li class="wrapper__main-list-item">
        <header class="wrapper__main-list-item-header">
          <h2 class="wrapper__main-list-item-heading">${item.title} ${item.id}</h2>
        </header>
        <main class="wrapper__main-list-item-main">
          <p class="wrapper__main-list-item-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, facere!
          </p>
        </main>
        <footer class="wrapper__main-list-item-footer">
          <img src="${item.url}" alt="${item.title}">
        </footer>
      </li>
      `;

      list_blocks.innerHTML += block;
    });
  }

  // Создание номеров страниц
  function generatePages(data) {
    const list_pages = document.querySelector('.wrapper__footer-pagination-list');

    for (let i = 1; i <= Math.ceil(data.length / total_blocks_on_page); i++) {
      const page = `
      <li class="wrapper__footer-pagination-list-item">
        <button class="${i === 1 ? 'active-page' : ''}">${i}</button>
      </li>
      `;

      list_pages.innerHTML += page;
    }
  }

  // Пагинация
  function setPagination(data) {
    const pages = document.querySelectorAll('.wrapper__footer-pagination-list-item button');
    const list_blocks = document.querySelector('.wrapper__main-list');

    const showActiveButton = index => pages[index].classList.add('active-page');
    const hideActiveButton = () => pages.forEach(item => item.classList.remove('active-page'));

    pages.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        active_page = index * total_blocks_on_page;
        const to = active_page + total_blocks_on_page;

        list_blocks.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        saveChange(active_page, to);
        hideActiveButton();
        showActiveButton(index);
      });
    });

    saveChange(0, total_blocks_on_page);

    function saveChange(from, to) {
      list_blocks.innerHTML = '';

      generateBlocks(data.slice(from, to));
    }
  }
}

pagination();