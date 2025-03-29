import { Button } from "neetoui";
import { Left,Right } from "neetoicons";
import { useState,useEffect,useRef } from "react";
import classNames from "classnames"

const Carousel = ({imageUrls, title}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    const resetTimer = () =>{
        clearInterval(timerRef.current);
        timerRef.current = setInterval(handleNext, 3000);
    }
    
    const handlePrevious = () =>{
        const prevIndex = (currentIndex =>((currentIndex-1 + imageUrls.length) % imageUrls.length));
        setCurrentIndex(prevIndex);
        resetTimer();
    }

    const handleNext = () => {
        const nextIndex = (currentIndex=>((currentIndex+1) % imageUrls.length));
        setCurrentIndex(nextIndex);
    }
    useEffect(() => {
        timerRef.current = setInterval(handleNext, 3000);
        return () => clearInterval(timerRef.current);
    },[]);

    return(
    <div className="flex items-center">
        <Button 
            className="shrink-0 focus-within:ring-0 hover:bg-transparent"
            icon={Left}
            style="text"
            onClick={handlePrevious}
            
        />
        <div className="flex flex-col items-center">
            <img 
                className="max-w-56 h-56 max-h-56 w-56"
                alt={title} 
                src={imageUrls[currentIndex]} 
            />
            <div className="flex space-x-1 pt-1">
                {imageUrls.map((_, index) => (
                    // const defaultClass = "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border";
                    // const classes = (index === currentIndex) ? defaultClass.concat("neeto-ui-bg-black") : defaultClass;
                    <span
                        key={index}
                        className= {classNames("neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border", 
                            {"neeto-ui-bg-black": index === currentIndex})}
                        onClick={() => {
                            setCurrentIndex(index);
                            resetTimer();
                        }}
                    />
                ))}
            </div>
        </div>
        <Button
            className="shrink-0 focus-within:ring-0 hover:bg-transparent"
            icon={Right}
            style="text"
            onClick={() =>{
                handleNext();
                resetTimer();
            }}
        />
    </div>
)
};

export default Carousel;