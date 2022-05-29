import { useState } from 'react';


function useRerender() {
    const [, rerender] = useState({ });

    return () => rerender({ });
};


export default useRerender;