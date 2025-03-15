import { useEffect, useRef } from 'react';

const PDFFlipbook = ({ fileUrl }) => {
    const devRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (devRef.current) {
            devRef.current.setAttribute('source', fileUrl);
            devRef.current.setAttribute('height', '500');
            devRef.current.setAttribute('webgl', 'true');
        }
    }, [devRef]);
    return <div ref={devRef} className="_df_book" id="df_manual_book"></div>;
};

export default PDFFlipbook;
