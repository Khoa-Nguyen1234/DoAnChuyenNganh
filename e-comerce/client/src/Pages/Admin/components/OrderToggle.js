import {useState} from 'react'
import Swal from 'sweetalert2'
import admin from '../../../services/admin.service'
import {getOrderList} from '../../../actions/admin'
import {useDispatch, useSelector} from 'react-redux';

function OrderToggle(props) { 

    const dispatch = useDispatch();
    const handleRemove = async (e, newState) => {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, changed it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                const data ={
                    page: 1,
                    perPage: 5,
                    sort: 0,
                }
                await admin.updateStatus({order_id: props.order_id, status: newState});
                await dispatch(getOrderList(data));
                setToggle(!dropdownToggle);
                swalWithBootstrapButtons.fire(
                    'Changed!',
                    'Your order has been changed.',
                    'success'
                )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your order is still the same',
                'error'
              )
            }
          })
    }

    const [dropdownToggle, setToggle] = useState(false);

    return (
        <div>
            <button className="table-action-button" onClick={() => setToggle(!dropdownToggle)}>Action <i class="action-arrow-down"></i></button>
            <div className={dropdownToggle ? "per-page-dropdown-admin show-page" : "per-page-dropdown-admin" }>
                <button onClick={(e) => handleRemove(e, 'Completed')}><span>Mark as complete</span></button>
                <button onClick={(e) => handleRemove(e, 'Canceled')}><span>Mark as canceled</span></button>
            </div>
        </div>
    )
}

export default OrderToggle;