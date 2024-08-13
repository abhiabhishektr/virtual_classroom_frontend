export interface courseListingDTO {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    fees: number;
    isPurchased: boolean;
    // isblocked: boolean;
}

export interface courseListingAdminDTO {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    fees: number;
    isPurchased: boolean;
    // isblocked: boolean; (not completed)
}

