export const renderLoading = (isLoading = false) => {
  const currentActiveButton = document.querySelector('.popup_opened .popup__save-button');
  if (isLoading) {
    currentActiveButton.textContent = 'Загрузка...';
    return;
  }
  currentActiveButton.textContent = 'Сохранить';
};