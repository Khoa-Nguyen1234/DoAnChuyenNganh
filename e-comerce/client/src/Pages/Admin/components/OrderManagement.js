import {React, useState, useRef, useEffect} from 'react';
import TopBar from './TopBar';
import {useDispatch, useSelector} from 'react-redux';
import Table from 'react-bootstrap/Table'
import {Pagination} from '@material-ui/lab';
import OrderToggle from './OrderToggle';
import admin from '../../../services/admin.service'
import {getOrderList} from '../../../actions/admin'
import {Link} from 'react-router-dom'

function OrderManagement() {

    const [perPageToggle, setPerPageToggle] = useState(false);
    const [pagination, setPagination] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [sortPage, setSortPage] = useState(0);
    const [sortToggle, setSortToggle] = useState(false)
    const sort = ['Date added', 'Name'];

    const pageList = useSelector(state=> state.adminOrder);

    const dispatch = useDispatch();

    const temptotalPage = pageList.totalPage;
    const temptotalProduct = pageList.totalOrder;

    const handleChangePage = (event, value) => {
        setPagination(value);
    }


    useEffect(async () => {
        const data ={
            page: pagination,
            perPage: perPage,
            sort: sortPage,
        }
        await dispatch(getOrderList(data));
    },[pagination, perPage, sortPage])


    return (
        <div className="Edit-Product">
            <TopBar name="Orders" subName=""/>
            <div >
                <div className="admin-mag-product">
                    <div className="admin-mag-product-left">
                        <p>SORT BY</p>
                        <button style={{ backgroundColor: 'white'}} onClick={() => setSortToggle(!sortToggle)}>
                            <p>{sort[sortPage]}</p>
                            <img src={process.env.PUBLIC_URL+'/arrow.svg'}/>
                        </button>
                        <div className={sortToggle ? "sort-dropdown-admin show-page" : "sort-dropdown-admin" }>
                            <button onClick={() => {setSortPage(0); setPagination(1); setSortToggle(!sortToggle)}}><span>Date added</span></button>
                            <button onClick={() => {setSortPage(1); setPagination(1); setSortToggle(!sortToggle)}}><span>Name</span></button>
                        </div>
                    </div>
                    <div className="admin-mag-product-right">
                        <input type="text" placeholder="Search order" className="admin-search-input" name="search-admin-product"/>
                        <button style={{ backgroundColor: 'white'}}>
                            <img src={process.env.PUBLIC_URL + '/export-orange.svg'}/>
                            <p style={{ color: '#ffa15f',}}>Export</p>
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <Table className="product-table" striped borderless>
                        <thead>
                            <tr className="table-header">
                                <th>ORDER ID</th>
                                <th>DATE CREATED</th>
                                <th>DETAILS</th>
                                <th>TOTAL($)</th>
                                <th>STATUS</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {pageList.order ? pageList.order.map(order => {
                                const date = new Date(order.createDate.toString());
                                const toDate = date.toDateString();
                                return <tr className="table-content-row">
                            <td>{order._id}</td>
                            <td>{toDate}</td>
                            <td>{order.product[0].product_name} ({order.product[0].size})x{order.product[0].quantity}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td><OrderToggle order_id={order._id}/></td>
                        </tr>}): ""}
                        </tbody>
                    </Table>
                
                    <div className="product-mag-footer">
                        <p>Show {(pagination-1)*perPage+1} to {pagination*perPage <= temptotalProduct ? pagination*perPage : pagination*perPage-(pagination*perPage-temptotalProduct)} of {temptotalProduct} products</p>
                        <div className="footer-pagination">
                            <button className="pagination-dropdown sort" onClick={() => setPerPageToggle(!perPageToggle)}>
                                <p>Per page: </p>
                                <h3>{perPage}</h3>
                                <img src={process.env.PUBLIC_URL + '/arrow.svg'}/>
                            </button>
                            <div className={perPageToggle ? "per-page-dropdown-admin show-page" : "per-page-dropdown-admin" }>
                                <button onClick={() => {setPerPage(10); setPagination(1)}}><span>10</span></button>
                                <button onClick={() => {setPerPage(20); setPagination(1)}}><span>20</span></button>
                                <button onClick={() => {setPerPage(50); setPagination(1)}}><span>50</span></button>
                                <button onClick={() => {setPerPage(100); setPagination(1)}}><span>100</span></button>
                            </div>
                            <Pagination count={temptotalPage} variant="outlined" shape="rounded" showFirstButton showLastButton page={pagination} onChange={handleChangePage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderManagement;