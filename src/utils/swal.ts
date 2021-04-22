import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(
  Swal.mixin({
    buttonsStyling: false,
    showCancelButton: false,
    background: '#25282c',
    confirmButtonText: 'Confirm',
    customClass: {
      confirmButton: 'btn btn-success',
    },
  }),
);

export default MySwal;
