import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick'; // react-slick installieren

const SwipeForecast = ({ forecast }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {forecast.map((entry, index) => (
                <div key={index}>
                    <div className="card">
                        {/* Anzeige der Vorhersage */}
                        <h5>{entry.main.temp}°C</h5>
                        <p>{entry.weather[0].description}</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default SwipeForecast;
