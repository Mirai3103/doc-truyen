export default function Comic({ params }: { params: { slug: string } }) {
    return <div className="min-h-[200vh]">{params.slug}</div>;
}
