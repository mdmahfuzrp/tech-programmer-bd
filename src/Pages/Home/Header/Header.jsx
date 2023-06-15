import img1 from '../../../assets/class-img/Abir-Illustrator-558px-364px.jpg'
import img2 from '../../../assets/class-img/Course-Banner-of-Material-Design-for-Web-Designer.jpg'
import img3 from '../../../assets/class-img/Create_Web_Template_Design_Using_Figma_558-364.jpg'
import img4 from '../../../assets/class-img/Motion-Graphics.jpg'
import img5 from '../../../assets/class-img/WhatsApp_Image_2022-09-10_at_10.24.24_AM.jpeg'
import img6 from '../../../assets/class-img/Typography-masrterclass_1.jpg'
import './Header.css'
import { FaSort } from "react-icons/fa";
const Header = () => {
    return (
        <div id="carousel" className='flex flex-col-reverse md:flex-row justify-between items-center gap-6'>
            <div className='max-w-[600px] md:max-w-[50%] text-center md:text-left'>
                <h1 className='text-4xl font-[800] text-[var(--text-primary-color)] opacity-80 mb-5'>Tech <span className='text-[var(--common-secondary-color)] font-[700]'>Programmer</span> BD</h1>
                <p>Buy our course now for grow your technical skills with <span className='text-[var(--common-secondary-color)]'>Tech Programmer BD</span>. - Your future our responsibility and our goal is make a new example like you, who have done multiple dreams with us.</p>
                <button className='custom-btn mt-5'>Show Course</button>
            </div>
            <div className='flex items-center gap-2'>
                <div id='arrow-btn' className='border-2 rounded-lg px-1 py-2 border-[var(--common-secondary-color)] text-[var(--text-secondary-color)]'>
                    <FaSort size={25}/>
                </div>
                <div id='carousel-wrapper' className="custom-big-box-shadow h-96 carousel carousel-vertical rounded-box">
                    <div className="carousel-item h-full cursor-n-resize">
                        <img className='object-cover' src={img1} />
                    </div>
                    <div className="carousel-item h-full cursor-n-resize">
                        <img className='object-cover' src={img2} />
                    </div>
                    <div className="carousel-item h-full cursor-n-resize">
                        <img className='object-cover' src={img3} />
                    </div>
                    <div className="carousel-item h-full cursor-n-resize">
                        <img className='object-cover' src={img4} />
                    </div>
                    <div className="carousel-item h-full cursor-n-resize">
                        <img className='object-cover' src={img5} />
                    </div>
                    <div className="carousel-item h-full cursor-n-resize">
                        <img className='object-cover' src={img6} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;