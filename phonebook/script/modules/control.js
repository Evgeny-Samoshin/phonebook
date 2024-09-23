import getStorage, { setStorage, removeStorage } from "./serviceStorage.js";
import { renderContacts, addContactPage } from "./render.js";

const sortByName = (list, data) => {
  data = getStorage('data');
  data.sort((a, b) => a.name.localeCompare(b.name));
  console.log(data);

  renderContacts(list, data);
};

const sortBySurname = (list, data) => {
  data = getStorage('data');
  data.sort((a, b) => a.surname.localeCompare(b.surname));
  console.log(data);

  renderContacts(list, data);
};

const modalControl = (btnAdd, formOverlay, closeBtn) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    if (e.target === formOverlay || e.target === closeBtn) {
      closeModal();
    }
  });

  return {
    closeModal,
  }
};

const deleteControl = (btnDel, list, data) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    })
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      const phone = e.target.closest('.contact').querySelector('.table-phone').textContent;
      removeStorage(phone);
      e.target.closest('.contact').remove();
    };
  });
};

const sortControl = (thead, list, data) => {
  thead.addEventListener('click', e => {
    if (e.target.closest('.th-name')) {
      console.log(e.target);

      sortByName(list, data);
    };
    if (e.target.closest('.th-surname')) {
      console.log(e.target);

      sortBySurname(list, data);
    };
  });
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);

    setStorage('data', newContact);
    addContactPage(newContact, list);
    form.reset();
    closeModal();
  });
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export {
  hoverRow,
  modalControl,
  deleteControl,
  sortControl,
  formControl,
};