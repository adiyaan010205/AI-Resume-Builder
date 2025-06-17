export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

export const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const showNotification = (message, type = 'success') => {
  const notification = document.getElementById('notification');
  const notificationMessage = notification.querySelector('.notification__message');
  
  notification.className = `notification show ${type}`;
  notificationMessage.textContent = message;
  
  setTimeout(() => {
    notification.className = 'notification';
  }, 3000);
};

export const toggleFullscreen = () => {
  const preview = document.getElementById('resumePreview');
  if (!document.fullscreenElement) {
    preview.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

export default {
  formatDate,
  getRandomItems,
  showNotification,
  toggleFullscreen,
}; 