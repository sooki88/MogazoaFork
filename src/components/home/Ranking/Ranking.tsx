import { useQuery } from "@tanstack/react-query";
import RankingListItem from "../../common/menu/RankingListItem";
import { getUserRank, getUserReviewed, getUserData } from "@/src/apis/user";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { PAGE_ROUTES } from "@/src/routes";
import { GetUserRankResponseType } from "@/src/apis/user/schema";

export default function Ranking() {
  const { data: userRank } = useQuery<any>({
    queryKey: ["userRank"],
    queryFn: () => getUserRank(),
  });

  const [userDetails, setUserDetails] = useState<GetUserRankResponseType[]>([]);

  useEffect(() => {
    if (userRank) {
      const rankingArr = userRank.slice(0, 5);
      setUserDetails(rankingArr);
    }
  }, [userRank]);

  return (
    <>
      {userDetails?.map((user: any, index: number) => {
        return (
          <Link key={index} href={PAGE_ROUTES.USER_DETAIL(user.id)}>
            <RankingListItem
              userImage={user.image}
              rankNum={String(index + 1)}
              ranking={index + 1}
              reviewerName={user.nickname}
              Followers={user.followersCount}
              Reviewer={user.reviewCount}
            />
          </Link>
        );
      })}
    </>
  );
}
