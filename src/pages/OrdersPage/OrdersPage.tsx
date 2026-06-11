import { useState, useEffect } from 'react';
import { pluralize } from '@/utils/formatters';
import { apiService } from '@/api/apiService';
import type { Order } from '@/types/order';
import OrdersSkeleton from './OrdersSkeleton'
import OrderCard from '@/components/OrderCard/OrderCard'
import './OrdersPage.css';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const apiResult = await apiService.getOrders(1);

            if (apiResult.error) {
                setError(apiResult.error);
            } else {
                setOrders(apiResult.data);
            }
            setIsLoading(false);
        };
        fetchOrders();
    }, [])

    if (error) {
        return <main className="orders-page">{error}</main>; // позже тут будет ErrorState
    }

    if (isLoading || !orders) {
        return <OrdersSkeleton />;
    }


    return (
        <main className="orders-page">
            <section className="orders-section" aria-labelledby="orders-title">
                <div className="orders-section__header">
                    <h1 className="orders-section__title" id="orders-title">Мои заказы</h1>
                    <span className="orders-section__count">{orders.length} {orders.length} {pluralize(orders.length, ['заказ', 'заказа', 'заказов'])}</span>
                </div>

                <div className="orders-list">
                    {orders.map((order) => <OrderCard order={order} key={order.id} />)}
                </div>
            </section>
        </main>
    );
};

export default OrdersPage;