import { ElCard } from "element-plus";
import { MCountTo } from "@/components/global/m_count_to";

export const Card = () => {

  return (
    <ElCard
      shadow={"hover"}
      class={"flex-1 min-h-0 min-w-0"}
      bodyStyle={{ height: "150px", padding: "unset" }}
    >
      {{
        default: () => <MCountTo/>,
        header: () => "adaasddas",
      }}
    </ElCard>
  );
};
