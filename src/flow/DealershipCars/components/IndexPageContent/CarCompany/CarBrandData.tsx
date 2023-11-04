import TOYOTA from "../../../Images/Car-Brand/toyota-brand.png";
import NISSAN from "../../../Images/Car-Brand/nissan-brand.png";
import HONDA from "../../../Images/Car-Brand/honda-brand.png";
import SUBARU from "../../../Images/Car-Brand/subaru-brand.png";
import MAZDA from "../../../Images/Car-Brand/mazda-brand.png";
import MITSUBISHI from "../../../Images/Car-Brand/mitsubichi-brand.png";
import INFINITY from "../../../Images/Car-Brand/infinity-brand.png";
import LEXUS from "../../../Images/Car-Brand/lexus.png";

export interface CarBrands {
    id: number,
    srcImage: string
}


export const carBrandData : CarBrands[]  = [
    {
        id: 1,
        srcImage: NISSAN
    },
    {
        id: 2,
        srcImage: TOYOTA
    },
    {
        id: 3,
        srcImage: HONDA
    },
    {
        id: 4,
        srcImage: SUBARU
    },
    {
        id: 5,
        srcImage: MAZDA
    },
    {
        id: 6,
        srcImage: MITSUBISHI
    },
    {
        id: 7,
        srcImage: INFINITY
    },
    {
        id: 8,
        srcImage: LEXUS
    }
];
