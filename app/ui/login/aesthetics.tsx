export default function LoginAesthetics() {
    return (
        <>
            {/* Aesthetics */}
            <div className="animated-bg hidden xl:block">
                {/* Phone */}
                <div className="icon bg-[url('/4.svg')] bottom-[10%] left-[5%] -rotate-[35deg] opacity-70"></div>
                {/* Keys */}
                <div className="icon bg-[url('/3.svg')] top-[14%] left-[25%] opacity-70 xl:left-[30%]"></div>
                {/* Earbuds */}
                <div className="icon bg-[url('/5.svg')] top-[10%] left-[5%] rotate-[20deg] opacity-70"></div>
                {/* ID */}
                <div className="icon bg-[url('/6.svg')] bottom-[10%] left-[35%] rotate-[20deg] opacity-70"></div>
            </div>
        </>
    );
}