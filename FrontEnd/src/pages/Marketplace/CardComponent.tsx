import { useCreateOrderMutation } from '../../services/ordersService.ts';
import { imagePlaceholder } from '../../utils/imagePlaceholder.ts';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct, IUser } from '../../types/types.ts';
import { Fade } from '@mui/material';
import { toast } from 'react-toastify';
import ProductModal from './ProductModal.tsx';
import Popup from '../../components/Popup.tsx';

type CardComponentProps = {
    product: IProduct;
};

const CardComponent = ({ product }: CardComponentProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const selectValue = useRef(1);
    const [createOrder] = useCreateOrderMutation();
    const navigate = useNavigate();

    // const options = [];
    // if (product.quantityForSale) {
    //     for (let i = 1; i <= product.quantityForSale; i++) {
    //         options.push({ value: i });
    //         if (i > 50) {
    //             break;
    //         }
    //     }
    // }

    const setSelectValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectValue.current = Number(e.currentTarget.value);
    };

    const onBuy = async () => {
        const user: IUser = JSON.parse(sessionStorage.getItem('user') as string);

        const order: {
            quantity: number;
            productId: number;
            email: string
        } = {
            quantity: selectValue.current,
            productId: product.id,
            email: user.email,
        };

        const response = await createOrder(order);
        if ('data' in response) {
            toast.success('Order placed!');
            navigate('/my-orders');
        }

        setAnchorEl(null);
    };

    const popupMessage = `Are you sure you want to buy ${selectValue.current} item for
    ${product.price as number * selectValue.current} BGN ?`;

    return (
        <>
            <ProductModal product={product} showProductModal={showProductModal} setShowProductModal={setShowProductModal} />
            <Popup popupMessage={popupMessage} onYes={onBuy} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
            <Fade in={true} timeout={1000}>
                <div className='product' role='cell'>
                    <a className='productButton' onClick={() => setShowProductModal(true)}>
                        <img src={product.imageUrl || imagePlaceholder} alt='Product-image' />
                    </a>
                    <div className='productContent'>
                        <div className='price'>
                            <span>{product.price} BGN</span>
                            <small>{product.type}</small>
                        </div>
                        <div className='quantityAndImg'>
                            <form>
                                <div className='quantity'>
                                    <span>Qty</span>
                                    <select
                                        className='randomNumberSelect'
                                        onChange={setSelectValue}
                                    >
                                        {Array(product.quantityForSale).fill(1).map((n, i) => n + i).map((o) => (
                                            <option value={o} key={o}>
                                                {o}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type='button' role='button' className='buyButton' onClick={(e) => setAnchorEl(e.currentTarget)} >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='31'
                                        height='31'
                                        fill='none'
                                        viewBox='0 0 31 31'
                                    >
                                        <circle cx='15.5' cy='15.5' r='15.5' fill='#ED1C25'></circle>
                                        <path
                                            fill='#fff'
                                            d='M24.67 11.955L19.047 6.33a1.126 1.126 0 00-1.871.462c-.255.826-.695 1.545-1.347 2.196-.87.87-2.005 1.53-3.205 2.226-1.273.739-2.589 1.503-3.667 2.581-.917.918-1.54 1.938-1.906 3.123-.123.4-.016.832.279 1.128l5.625 5.625a1.126 1.126 0 001.87-.463c.256-.827.697-1.545 1.35-2.196.87-.87 2.003-1.529 3.204-2.225 1.272-.74 2.588-1.504 3.666-2.582.916-.916 1.54-1.938 1.907-3.122.122-.4.014-.834-.28-1.128zm-10.92 10.92L8.125 17.25c1.599-5.175 8.527-4.95 10.125-10.125l5.626 5.625c-1.6 5.174-8.528 4.95-10.126 10.125zm4.254-8.494a1.504 1.504 0 00-.554-.31 1.61 1.61 0 00-.556-.059 1.994 1.994 0 00-.562.13c-.19.073-.38.153-.57.245-.303-.347-.605-.69-.907-1.008.136-.123.269-.186.396-.19.127-.006.25.008.367.037.118.03.227.055.327.075a.302.302 0 00.266-.067.373.373 0 00.133-.271.449.449 0 00-.13-.324.727.727 0 00-.432-.25 1.338 1.338 0 00-.523.012 1.978 1.978 0 00-.892.488l-.11-.103a.211.211 0 00-.152-.057.196.196 0 00-.154.075.203.203 0 00-.051.16c.005.06.03.107.071.142l.11.094a2.585 2.585 0 00-.356.568 1.9 1.9 0 00-.172.6c-.022.196-.001.376.06.543.06.168.17.311.333.446.265.22.577.314.938.293.361-.022.75-.13 1.168-.354.332.384.665.764.997 1.118-.14.119-.264.187-.372.209a.582.582 0 01-.293-.006.933.933 0 01-.244-.117 1.718 1.718 0 00-.223-.132.519.519 0 00-.224-.057c-.076-.001-.158.036-.248.113a.362.362 0 00-.138.279c0 .104.048.21.143.318.096.108.22.198.37.27a1.388 1.388 0 001.098.036c.209-.076.415-.213.619-.417.098.095.197.186.295.274a.203.203 0 00.154.05c.059-.003.11-.03.151-.08a.217.217 0 00.053-.164.192.192 0 00-.07-.138 7.373 7.373 0 01-.296-.25c.168-.206.303-.424.403-.64.1-.216.16-.425.179-.618.02-.195-.004-.37-.067-.53a1.077 1.077 0 00-.335-.433zm-3.145.382a.546.546 0 01-.42-.164.413.413 0 01-.11-.181.566.566 0 01-.022-.235.75.75 0 01.077-.262 1.07 1.07 0 01.183-.264c.285.284.57.595.855.917-.216.118-.404.182-.563.189zm2.653 1.126c-.05.093-.109.177-.177.249a23.06 23.06 0 01-.945-1.027c.08-.036.165-.074.256-.112.091-.038.182-.064.274-.08a.722.722 0 01.277.012.57.57 0 01.259.151c.079.08.13.162.15.25.021.09.022.182.007.275a.907.907 0 01-.101.282zm-2.234 2.587a.28.28 0 01.376.418c-.009.009-.018.015-.029.023h.002c-.357.271-.65.515-.965.83a7.635 7.635 0 00-.765.89l-.36.491a.263.263 0 01-.041.057.283.283 0 01-.436-.353l-.002-.001.385-.525c.24-.329.516-.65.822-.956.317-.319.66-.604 1.012-.874h.001zm2.06-8.136c.284-.285.541-.584.765-.89l.373-.511a.284.284 0 11.465.316l-.384.528c-.24.328-.516.649-.822.955-.317.317-.66.603-1.012.873l-.002-.001a.283.283 0 01-.393-.008.285.285 0 01.066-.45c.33-.253.65-.518.944-.812z'
                                        ></path>
                                        <defs>
                                            <clipPath id='clip0_9_220'>
                                                <path
                                                    fill='#fff'
                                                    d='M0 0H18V18H0z'
                                                    transform='translate(7 6)'
                                                ></path>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default CardComponent;
