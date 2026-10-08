import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FavoriteButton } from "@/components/FavoriteButton";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: "Not Found | Atelier Rose" };
  }

  return { title: `${product.name} | Atelier Rose` };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F3] text-[#3F2A2A]">
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-6 -ml-4 text-[#7A4E4E]">
          <Link href="/" data-testid="link-back">
            &larr; Back to Collection
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10" data-testid="product-detail">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden bg-white shadow-sm border border-[#ECD7D1] aspect-[4/5] relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span 
              className="text-sm font-semibold uppercase tracking-widest text-[#9E6569] mb-2"
              data-testid="detail-category"
            >
              {product.category}
            </span>
            <h1 
              className="text-3xl sm:text-4xl font-extrabold font-serif text-[#3F2A2A] mb-4"
              data-testid="detail-name"
            >
              {product.name}
            </h1>
            <p 
              className="text-2xl text-[#8A5A5D] font-medium mb-6"
              data-testid="detail-price"
            >
              ${product.price.toFixed(2)}
            </p>
            <div className="prose prose-sm text-[#7A4E4E] mb-8">
              <p data-testid="detail-description">{product.description}</p>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1 rounded-xl bg-[#A84A52] hover:bg-[#8F3F45] text-white py-6 text-lg">
                Add to Cart
              </Button>
              <FavoriteButton productId={product.id} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
