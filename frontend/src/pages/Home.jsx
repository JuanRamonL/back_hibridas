import Card from "../components/blog/Card"

function Home() {
    return (
        <main className="container">
            <div className="hero-section text-center d-flex align-items-center">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-9">
                        <h1 className="mb-3 fw-bold">Nuestro Blog</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit sint sit, distinctio nisi ea expedita culpa dicta fuga! Porro numquam molestiae odit! Aliquam, nobis explicabo!</p>
                    </div>
                </div>
            </div>
            <div className="mb-5 pb-5">
                <h2 className="fw-bold mb-4">Posteos recientes</h2>
                <div className="row g-4">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </main>
    )
}

export default Home