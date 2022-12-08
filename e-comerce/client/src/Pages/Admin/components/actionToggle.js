import {useState} from 'react'
import Swal from 'sweetalert2'
import admin from '../../../services/admin.service'
import {getProductList} from '../../../actions/admin'
import {useDispatch, useSelector} from 'react-redux';

function ActionToggle(props) { 

    const dispatch = useDispatch();
    const handleEdit = async () => {
        const { value: newStock } = await Swal.fire({
            title: 'Enter your new stock',
            input: 'number',
            inputPlaceholder: 'Enter your new stock',
            inputAttributes: {
            }
        })
        if (newStock) {
            const data ={
                page: 1,
                perPage: 5,
                sort: 0,
            }
            await admin.changeStock({quantity: newStock, product_id: props.product_id});
            await dispatch(getProductList(data));
            setToggle(!dropdownToggle);
            Swal.fire(`Updated Stock to: ${newStock}`)
        }
    }
    const handleRemove = async () => {
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
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                const data ={
                    page: 1,
                    perPage: 5,
                    sort: 0,
                }
                await admin.deleteProduct(props.product_id);
                await dispatch(getProductList(data));
                setToggle(!dropdownToggle);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your product is safe :)',
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
                <button onClick={handleEdit}><img src={process.env.PUBLIC_URL + '/edit.svg'}/><span>Edit</span></button>
                <button onClick={handleRemove}><img src={process.env.PUBLIC_URL + '/remove.svg'}/><span>Remove</span></button>
            </div>
        </div>
    )
}

export default ActionToggle;