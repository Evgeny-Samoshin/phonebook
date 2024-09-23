import getStorage from "./modules/serviceStorage.js";
import {renderPhoneBook, renderContacts} from "./modules/render.js";
import * as control from './modules/control.js';

{const init = (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const data = getStorage('data');
  console.log(data);
  
  const {
    list,
    logo,
    btnAdd,
    btnDel,
    formOverlay,
    form,
    closeBtn,
    thead,
  } = renderPhoneBook(app, title);

  //Функционал

  const allRow = renderContacts(list, data);

  control.hoverRow(allRow, logo);
  const {closeModal} = control.modalControl(btnAdd, formOverlay, closeBtn);
  control.deleteControl(btnDel, list, data);
  control.sortControl(thead, list, data);
  control.formControl(form, list, closeModal);
};

window.phoneBookInit = init;}