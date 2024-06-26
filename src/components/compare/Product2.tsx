import * as S from "@/src/components/compare/Styled/BodyContainer";
import { ProductInput } from "@/src/components/compare/Styled/StyledProductInput";
import { Label } from "@/src/components/compare/Styled/StyledProductInput";
import { useEffect, useState } from "react";
import { CompareChipB } from "@/src/components/common/chip/CompareChip";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/src/routes";
import { getProducts, getProductDetail } from "@/src/apis/product";
import { ProductCheckedNameWrap, ProductCheckedNameItem } from "@/src/components/compare/Styled/StyledItem";

type Product2Props = {
  handleProductBData: (productName: string) => void;
  handleTableClose: () => void;
};

export default function Product2({ handleProductBData, handleTableClose }: Product2Props) {
  const [product2, setProduct2] = useState("");
  const [product2Chip, setProduct2Chip] = useState("");
  const [productId, setProductId] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const [isShowChip2, setIsShowChip2] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("productBName")) {
      setProduct2(localStorage.getItem("productBName") as string);
      setProduct2Chip(localStorage.getItem("productBName") as string);
      setProductId(Number(localStorage.getItem("productBId")));
      setReadOnly(true);
      setIsShowChip2(true);
      setProduct2("");
    }
  }, []);

  const handleProductBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct2(e.target.value);
    setProduct2Chip(e.target.value);
    setReadOnly(false);
    if (e.target.value === "") {
      handleDelete();
    }
  };
  const handleAddProductB = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && product2.trim() !== "") {
      const inputElement = e.target as HTMLInputElement;
      setProduct2Chip(inputElement.value);
      setProduct2("");
      setReadOnly(true);
      setIsShowChip2(true);
    }
  };
  const handleDelete = () => {
    setIsShowChip2(false);
    setReadOnly(false);
    handleTableClose();
    handleProductBData("");

    localStorage.removeItem("productBName");
    localStorage.removeItem("productBId");
  };

  const handleClickSearch = (e: React.MouseEvent<HTMLInputElement>) => {
    const productName = e.currentTarget.innerText;
    setProduct2Chip(productName);
    setReadOnly(true);
    setIsShowChip2(true);
    setProduct2("");
  };
  const { data: productB, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, { keyword: product2Chip }],
    queryFn: () => getProducts({ keyword: product2Chip }),
    enabled: !!product2Chip,
  });

  const { data: productBDetail } = useQuery({
    queryKey: [QUERY_KEY.PRODUCT_DETAIL, productId, product2],
    queryFn: () => getProductDetail(productId),
    // enabled: !!product2Chip,
  });

  useEffect(() => {
    handleProductBData(productBDetail as any);
    if (productBDetail) {
      //undefined 안뜨게 if로 조건 설정
      localStorage.setItem("productBName", productBDetail?.name);
      localStorage.setItem("productBId", String(productBDetail?.id));
    }
  }, [productBDetail]);

  const [product2Data, setProduct2Data] = useState<any>();
  useEffect(() => {
    setIsShow(false);
    if (isSuccess) {
      if (product2 === "") {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    }
  }, [isSuccess, productB, product2Chip, product2Data]);

  return (
    <>
      <S.InputContainer>
        <Label>상품2</Label>
        <S.TagContainer>
          <ProductInput
            value={product2}
            onChange={handleProductBChange}
            onKeyDown={handleAddProductB}
            readOnly={readOnly}
          />
          {isShowChip2 && (
            <S.ChipContainer onClick={handleDelete}>
              <CompareChipB $productName={product2Chip} />
            </S.ChipContainer>
          )}
        </S.TagContainer>
        {isShow && (
          <ProductCheckedNameWrap>
            {productB?.list?.map((product) => (
              <ProductCheckedNameItem
                key={product.id}
                onClick={(e) => {
                  handleClickSearch(e as any);
                  setProductId(product.id);
                }}>
                {product.name}
              </ProductCheckedNameItem>
            ))}
          </ProductCheckedNameWrap>
        )}
      </S.InputContainer>
    </>
  );
}
