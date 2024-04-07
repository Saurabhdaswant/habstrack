import  { useState } from 'react'

export default function useToggle(initialValue) {

    if(typeof initialValue !== 'boolean'){
        console.warn('Invalid type for useToggle');
    }

    const [value , setValue] = useState(initialValue)

    function toggleValue(){
        setValue(currentValue  => !currentValue)
    }

  return [value , toggleValue]
}
