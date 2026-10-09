import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface IProduct {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const MarqueePage = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const headlines: IProduct[] = await res.json();

  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };

  const getBanglaUnit = (unit: string): string => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit == "piece") return "পিস";
    if (unit == "dozen") return "ডজেন";
    return unit;
  };

  return (
    <div className="border-b border-gray-200 bg-white py-2">
      <MarqueeText direction="right" duration={13}>
        <div className="flex items-center">
          {headlines.map((headline) => (
            <div
              key={headline.id}
              className="mx-6 flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
            >
              <span className="text-base">{headline.image}</span>

              <span className="font-medium text-gray-800">
                {headline.nameBn}
              </span>

              <span className="font-semibold text-gray-900">
                {toBanglaNumber(headline.today)} টাকা/
                {getBanglaUnit(headline.unit)}
              </span>

              <span
                className={
                  headline.change.dir === "up"
                    ? "font-medium text-red-500"
                    : headline.change.dir === "down"
                      ? "font-medium text-green-600"
                      : "font-medium text-gray-500"
                }
              >
                {headline.change.dir === "up"
                  ? "▲"
                  : headline.change.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {toBanglaNumber(Math.abs(headline.change.pct))}%
              </span>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default MarqueePage;
