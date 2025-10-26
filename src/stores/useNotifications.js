import Swal from 'sweetalert2';

export function useNotifications() {
  const showAlert = (title, text, icon = 'info') => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#374151',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        title: 'text-gray-900 font-bold text-xl',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-3 rounded-lg font-semibold shadow-sm'
      }
    });
  };

  const showConfirm = (title, text, confirmButtonText = 'Delete', icon = 'warning') => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        title: 'text-gray-900 font-bold text-xl',
        htmlContainer: 'text-gray-600',
        confirmButton: 'px-6 py-3 rounded-lg font-semibold shadow-sm',
        cancelButton: 'px-6 py-3 rounded-lg font-semibold border border-gray-300'
      }
    });
  };

  const showSuccess = (title, text = '') => {
    return showAlert(title, text, 'success');
  };

  const showError = (title, text = '') => {
    return showAlert(title, text, 'error');
  };

  const showWarning = (title, text = '') => {
    return showAlert(title, text, 'warning');
  };

  return {
    showAlert,
    showConfirm,
    showSuccess,
    showError,
    showWarning
  };
}