import {
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    RotateCw,
    ZoomIn,
    ZoomOut,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFFlipbookProps {
    fileUrl: string;
}

// Tạo component cho từng trang PDF
const PDFPage = React.forwardRef<
    HTMLDivElement,
    {
        pageNumber: number;
        fileUrl: string;
        scale: number;
        rotation: number;
        width: number;
        onLoaded?: () => void;
    }
>(({ pageNumber, fileUrl, scale, rotation, width, onLoaded }, ref) => {
    return (
        <div ref={ref} className="page relative shadow-lg">
            <Document
                file={fileUrl}
                loading={
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                    </div>
                }
            >
                <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    width={width}
                    onLoadSuccess={onLoaded}
                    loading={
                        <div className="flex h-full w-full items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                        </div>
                    }
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="bg-white"
                />
            </Document>
        </div>
    );
});

PDFPage.displayName = 'PDFPage';

const PDFFlipbook: React.FC<PDFFlipbookProps> = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [rotation, setRotation] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageWidth, setPageWidth] = useState<number>(0);
    const [pageHeight, setPageHeight] = useState<number>(0);
    const [pagesLoaded, setPagesLoaded] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const bookRef = useRef<any>(null);
    const flipbookContainerRef = useRef<HTMLDivElement>(null);

    console.log('====================================');
    console.log(pageHeight);
    console.log('====================================');
    // Theo dõi trang thái toàn màn hình
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange,
            );
        };
    }, []);

    // Tính toán kích thước trang dựa trên kích thước container
    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                // Lấy kích thước container
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;

                // Tính kích thước trang PDF
                // Khi ở chế độ toàn màn hình, tận dụng nhiều không gian hơn
                const widthFactor = isFullscreen ? 0.48 : 0.45;
                const heightFactor = isFullscreen ? 0.85 : 0.8;

                const maxWidth = containerWidth * widthFactor;
                const maxHeight = containerHeight * heightFactor;

                // Set kích thước trang
                setPageWidth(maxWidth);
                setPageHeight(maxHeight);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isFullscreen]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    function zoomIn() {
        setScale((prevScale) => Math.min(prevScale + 0.2, 3));
    }

    function zoomOut() {
        setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
    }

    function rotateClockwise() {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
    }

    // Chuyển đổi chế độ toàn màn hình
    async function toggleFullscreen() {
        if (!isFullscreen) {
            try {
                if (containerRef.current) {
                    if (containerRef.current.requestFullscreen) {
                        await containerRef.current.requestFullscreen();
                    } else if (
                        (containerRef.current as any).mozRequestFullScreen
                    ) {
                        await (
                            containerRef.current as any
                        ).mozRequestFullScreen();
                    } else if (
                        (containerRef.current as any).webkitRequestFullscreen
                    ) {
                        await (
                            containerRef.current as any
                        ).webkitRequestFullscreen();
                    } else if (
                        (containerRef.current as any).msRequestFullscreen
                    ) {
                        await (
                            containerRef.current as any
                        ).msRequestFullscreen();
                    }
                }
            } catch (error) {
                console.error(
                    'Không thể chuyển sang chế độ toàn màn hình:',
                    error,
                );
            }
        } else {
            try {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if ((document as any).mozCancelFullScreen) {
                    await (document as any).mozCancelFullScreen();
                } else if ((document as any).webkitExitFullscreen) {
                    await (document as any).webkitExitFullscreen();
                } else if ((document as any).msExitFullscreen) {
                    await (document as any).msExitFullscreen();
                }
            } catch (error) {
                console.error('Không thể thoát chế độ toàn màn hình:', error);
            }
        }
    }

    // Theo dõi trang hiện tại từ react-pageflip
    const onFlip = (e: any) => {
        // react-pageflip tính trang từ 0, cần +1 để phù hợp với PDF
        const newPageNumber = e.data * 2 - 1;
        setPageNumber(newPageNumber > 0 ? newPageNumber : 1);
    };

    // Điều hướng trang thông qua nút
    const nextPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    const prevPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    };

    const goToPage = (pageNum: number) => {
        if (bookRef.current && numPages) {
            // Chuyển đổi số trang PDF sang số trang trong flipbook (trang lẻ và chẵn)
            const flipBookPage = Math.ceil(pageNum / 2);
            bookRef.current.pageFlip().flip(flipBookPage - 1);
        }
    };

    // Theo dõi tiến trình tải trang
    const handlePageLoaded = () => {
        setPagesLoaded((prev) => prev + 1);
        if (numPages && pagesLoaded >= numPages - 1) {
            setIsLoading(false);
        }
    };

    // Tạo mảng các trang PDF để hiển thị
    const renderPages = () => {
        if (!numPages) return null;

        const pages = [];

        // Trang bìa
        pages.push(
            <PDFPage
                key="cover"
                pageNumber={1}
                fileUrl={fileUrl}
                scale={scale}
                rotation={rotation}
                width={pageWidth}
                onLoaded={handlePageLoaded}
                ref={React.createRef()}
            />,
        );

        // Các trang còn lại
        for (let i = 2; i <= numPages; i++) {
            pages.push(
                <PDFPage
                    key={i}
                    pageNumber={i}
                    fileUrl={fileUrl}
                    scale={scale}
                    rotation={rotation}
                    width={pageWidth}
                    onLoaded={handlePageLoaded}
                    ref={React.createRef()}
                />,
            );
        }

        return pages;
    };

    return (
        <div
            className={`flex h-[200%] flex-col ${isFullscreen ? 'fullscreen-mode' : ''}`}
            ref={containerRef}
        >
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 p-2">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={zoomOut}
                        className="rounded p-2 hover:bg-gray-200"
                        title="Phóng nhỏ"
                    >
                        <ZoomOut size={20} />
                    </button>
                    <span className="text-sm">{Math.round(scale * 100)}%</span>
                    <button
                        onClick={zoomIn}
                        className="rounded p-2 hover:bg-gray-200"
                        title="Phóng to"
                    >
                        <ZoomIn size={20} />
                    </button>
                    <button
                        onClick={rotateClockwise}
                        className="rounded p-2 hover:bg-gray-200"
                        title="Xoay trang"
                    >
                        <RotateCw size={20} />
                    </button>
                    <button
                        onClick={toggleFullscreen}
                        className="rounded p-2 hover:bg-gray-200"
                        title={
                            isFullscreen
                                ? 'Thoát toàn màn hình'
                                : 'Toàn màn hình'
                        }
                    >
                        {isFullscreen ? (
                            <Minimize size={20} />
                        ) : (
                            <Maximize size={20} />
                        )}
                    </button>
                </div>

                <div className="flex items-center">
                    <span className="text-sm text-gray-600">
                        {pageNumber} / {numPages || '--'}
                    </span>
                </div>
            </div>

            {/* Document viewer */}
            <div
                className={`relative flex flex-1 items-center justify-center overflow-auto bg-gray-800 p-4 ${isFullscreen ? 'fullscreen-viewer' : ''}`}
            >
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
                        <div className="flex flex-col items-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                            <p className="mt-4 text-gray-700">
                                Đang tải tài liệu...
                            </p>
                        </div>
                    </div>
                )}

                {/* Document */}
                <div className="hidden">
                    <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onError={(e) => console.log(e)}
                    >
                        <Page pageNumber={1} />
                    </Document>
                </div>

                {/* Standalone react-pageflip component */}
                <div
                    className={`flipbook-container ${isFullscreen ? 'flipbook-fullscreen' : ''}`}
                    ref={flipbookContainerRef}
                >
                    {numPages && (
                        <HTMLFlipBook
                            width={pageWidth}
                            height={pageHeight}
                            minWidth={pageWidth * 0.5}
                            maxWidth={pageWidth * 1.5}
                            minHeight={pageHeight * 0.5}
                            maxHeight={pageHeight * 1.5}
                            maxShadowOpacity={0.5}
                            showCover={true}
                            mobileScrollSupport={true}
                            onFlip={onFlip}
                            className={`custom-book ${isFullscreen ? 'fullscreen-book' : ''}`}
                            ref={bookRef}
                            startPage={Math.ceil(pageNumber / 2) - 1}
                            useMouseEvents={true}
                            flippingTime={1000}
                            usePortrait={false}
                            startZIndex={20}
                            autoSize={true}
                            drawShadow={true}
                        >
                            {renderPages()}
                        </HTMLFlipBook>
                    )}
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className={`absolute left-4 z-10 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white ${
                        pageNumber <= 1 ? 'cursor-not-allowed opacity-50' : ''
                    } ${isFullscreen ? 'fullscreen-nav-button left-8' : ''}`}
                >
                    <ChevronLeft size={isFullscreen ? 32 : 24} />
                </button>

                <button
                    onClick={nextPage}
                    disabled={numPages !== null && pageNumber >= numPages}
                    className={`absolute right-4 z-10 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white ${
                        numPages !== null && pageNumber >= numPages
                            ? 'cursor-not-allowed opacity-50'
                            : ''
                    } ${isFullscreen ? 'fullscreen-nav-button right-8' : ''}`}
                >
                    <ChevronRight size={isFullscreen ? 32 : 24} />
                </button>
            </div>

            {/* Bottom controls - page navigation */}
            <div className="border-t border-gray-200 bg-gray-100 p-3">
                <div className="flex items-center justify-center space-x-4">
                    <button
                        onClick={() => goToPage(1)}
                        disabled={pageNumber <= 1}
                        className={`rounded border px-3 py-1 text-sm hover:bg-gray-200 ${
                            pageNumber <= 1
                                ? 'cursor-not-allowed opacity-50'
                                : ''
                        }`}
                    >
                        Trang đầu
                    </button>
                    <button
                        onClick={prevPage}
                        disabled={pageNumber <= 1}
                        className={`flex items-center rounded border px-3 py-1 hover:bg-gray-200 ${
                            pageNumber <= 1
                                ? 'cursor-not-allowed opacity-50'
                                : ''
                        }`}
                    >
                        <ChevronLeft size={16} />
                        Trước
                    </button>

                    <div className="flex items-center">
                        <input
                            type="number"
                            min={1}
                            max={numPages || 1}
                            value={pageNumber}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (
                                    !isNaN(value) &&
                                    value >= 1 &&
                                    (numPages === null || value <= numPages)
                                ) {
                                    goToPage(value);
                                }
                            }}
                            className="w-16 rounded border px-2 py-1 text-center text-sm"
                        />
                        <span className="mx-2 text-sm text-gray-600">
                            / {numPages || '--'}
                        </span>
                    </div>

                    <button
                        onClick={nextPage}
                        disabled={numPages !== null && pageNumber >= numPages}
                        className={`flex items-center rounded border px-3 py-1 hover:bg-gray-200 ${
                            numPages !== null && pageNumber >= numPages
                                ? 'cursor-not-allowed opacity-50'
                                : ''
                        }`}
                    >
                        Tiếp
                        <ChevronRight size={16} />
                    </button>
                    <button
                        onClick={() => numPages && goToPage(numPages)}
                        disabled={numPages !== null && pageNumber >= numPages}
                        className={`rounded border px-3 py-1 text-sm hover:bg-gray-200 ${
                            numPages !== null && pageNumber >= numPages
                                ? 'cursor-not-allowed opacity-50'
                                : ''
                        }`}
                    >
                        Trang cuối
                    </button>
                </div>
            </div>

            {/* CSS for flipbook with fullscreen support */}
            <style>{`
                .flipbook-container {
                    width: ${pageWidth * 2}px;
                    height: ${pageHeight}px;
                    position: relative;
                    margin: 0 auto;
                    transition: all 0.3s ease;
                }

                .flipbook-fullscreen {
                    width: ${pageWidth * 2}px;
                    height: ${pageHeight}px;
                }

                .page {
                    background-color: white;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                }

                .custom-book {
                    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.3);
                }

                .fullscreen-mode {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100vw;
                    height: 200vh;
                    z-index: 9999;
                    background: #000;
                }

                .fullscreen-viewer {
                    background-color: #121212;
                }

                .fullscreen-book {
                    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.5);
                }

                .fullscreen-nav-button {
                    padding: 1rem;
                    transform: scale(1.2);
                }

                @media (max-width: 768px) {
                    .flipbook-container {
                        width: 100%;
                        max-width: 100vw;
                        height: auto;
                    }

                    .fullscreen-nav-button {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default PDFFlipbook;
