import { TLazyLoadingType, TProduct } from '../../types';
import './LazyLoading.scss';

export function LazyLoading({type, arr} : {type: TLazyLoadingType, arr?:TProduct[]}): JSX.Element {
    
    // arr?.forEach()

    return(
        <> 
        {type=== 'favorites' && 
         <>
          <div className='lazy_loading_component'>
            <div className='ProductCard_mini_load'>
                <section className='info_load'>
                    <div className='img_productCard_mini_load' />
                    <div className='line-limit-length_load'/>
                    <div className='price_load'/>
                </section>
                    <div className='action'>
                        <div className='in_cart_load'/>
                        <div className='in_cart_'/>
                    </div>
            </div>
          </div>
         </>
        }
        </>
     
    )
}