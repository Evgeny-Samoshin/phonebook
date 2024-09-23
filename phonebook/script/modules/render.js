import {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
} from "./createElements.js";

const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const btnGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);

  const table = createTable();
  const {form, overlay, closeBtn} = createForm();
  const footer = createFooter(title);

  header.headerContainer.append(logo);
  main.mainContainer.append(btnGroup.btnWrapper, table, overlay);

  app.append(header, main, footer);

  return {
    list: table.tbody,
    logo,
    btnAdd: btnGroup.btns[0],
    btnDel: btnGroup.btns[1],
    formOverlay: overlay,
    form,
    closeBtn,
    thead: table.thead,
  };
};

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');
  const buttonDel = document.createElement('button');
  buttonDel.classList.add('del-icon');
  tdDel.append(buttonDel);

  const tdName = document.createElement('td');
  tdName.textContent = firstName;

  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;

  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');
  phoneLink.classList.add('table-phone');
  phoneLink.href = `tel:${phone}`;
  tdPhone.append(phoneLink);
  phoneLink.textContent = phone;
  tr.phoneLink = phoneLink;

  const tdEdit = document.createElement('td');
  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('edit-icon');
  buttonEdit.type = 'button';
  tdEdit.append(buttonEdit);

  tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

  return tr;
};

const renderContacts = (list, data) => {
  console.log(data);
  
  localStorage.setItem('data', JSON.stringify(data));
  const allRow = data.map(createRow);

  list.innerHTML = '';
  list.append(...allRow);

  return allRow;
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export {
  renderPhoneBook,
  renderContacts,
  addContactPage,
};