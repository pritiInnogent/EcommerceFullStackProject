import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../redux/orderSlice';
import { cancelOrder as cancelOrderAPI } from '../services/api';
import './Orders.css';

function Orders() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const [cancelling, setCancelling] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }
        try {
            setCancelling(orderId);
            await cancelOrderAPI(orderId);
            dispatch(updateOrderStatus({ orderId, status: 'CANCELLED' }));
            alert('Order cancelled successfully!');
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('Failed to cancel order. Please try again.');
        } finally {
            setCancelling(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return '#ffc107';
            case 'DELIVERED':
                return '#28a745';
            case 'CANCELLED':
                return '#dc3545';
            default:
                return '#6c757d';
        }
    };

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    if (error) {
        return <div className="error">Error loading orders: {error}</div>;
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="no-orders">
                <h2>No orders yet</h2>
                <p>Start shopping to see your orders here!</p>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h1>My Orders</h1>

            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <div>
                                <h3>Order #{order.id}</h3>
                                <p className="order-date">
                                    Placed on: {new Date(order.placedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="order-header-actions">
                <span
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
                                {order.status === 'PENDING' && (
                                    <button
                                        className="cancel-order-btn"
                                        onClick={() => handleCancelOrder(order.id)}
                                        disabled={cancelling === order.id}
                                    >
                                        {cancelling === order.id ? 'Cancelling...' : 'Cancel Order'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="order-items">
                            {order.items && order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="order-item-info">
                                        <p className="order-item-title">{item.title}</p>
                                        <p className="order-item-quantity">Quantity: {item.quantity}</p>
                                        <p className="order-item-price">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <div className="order-address">
                                <h4>Delivery Address</h4>
                                <p>{order.address.fullName}</p>
                                <p>{order.address.address}</p>
                                <p>
                                    {order.address.city}, {order.address.state} {order.address.zipCode}
                                </p>
                                <p>{order.address.country}</p>
                            </div>

                            <div className="order-total">
                                <h4>Order Total</h4>
                                <p className="total-amount">${order.total.toFixed(2)}</p>
                                {order.discount > 0 && (
                                    <p className="discount-info">
                                        Discount applied: {order.discount}%
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
