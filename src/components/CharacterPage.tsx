import React from "react";
import { fetcher } from "../libs/fetcher";
import useSWR from "swr";
import { FaFemale, FaMale } from "react-icons/fa";
import { RiGenderlessLine } from "react-icons/ri";
import { TbGenderAgender } from "react-icons/tb";
import Loading from "./Loading";
import Error from "./Error";
import { apiUrl } from "../libs/api-url";

interface PageProps {
  index: number;
  onItemClick: (id: number) => void;
}

interface CharactersProps {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
}

const CharacterPage: React.FC<PageProps> = ({ index, onItemClick }) => {
  const { data, error, isLoading } = useSWR(
    `${apiUrl}character?page=${index}&limit=10`,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="md:grid md:grid-cols-2 gap-5">
      {data &&
        data.results.map((item: CharactersProps) => (
          <div className="xs:pb-5" key={item.id}>
            <div className="card card-side card-bordered bg-base-100 shadow-xl">
              <figure className="w-36">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full object-cover"
                />
              </figure>
              <div className="card-body p-2 w-36 text-sm text-left">
                <div className="flex justify-between items-center">
                  <div className="card-title line-clamp-1 text-primary">
                    {item.name}
                  </div>
                  <div className="text-xl pr-1">
                    {item.gender === "Male" ? (
                      <FaMale className="text-sky-500" />
                    ) : item.gender === "Female" ? (
                      <FaFemale className="text-pink-300" />
                    ) : item.gender === "Genderless" ? (
                      <RiGenderlessLine />
                    ) : (
                      <TbGenderAgender />
                    )}
                  </div>
                </div>
                <div>
                  status :{" "}
                  <span
                    className={`${item.status === "Alive" ? "text-alive" : item.status === "Dead" ? "text-dead" : ""}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div>species : {item.species}</div>
                <div
                  className="pt-3 cursor-pointer"
                  onClick={() => onItemClick(item.id)}
                >
                  Click for more detail
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CharacterPage;
