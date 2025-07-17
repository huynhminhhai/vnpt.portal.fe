import { useArray } from '@sa/hooks';
import { AnimatePresence, motion } from 'framer-motion';

import SoybeanAvatar from '@/components/SoybeanAvatar';

const variants = {
  exit: { opacity: 0, transition: { duration: 0.3 }, x: 200 },
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, transition: { duration: 0.3 }, y: 0 }
};

const ProjectNews = () => {
  const { t } = useTranslation();

  const [newses, { down, pop, push, remove, reset, reverse, shift, sort, unshift, up }] = useArray([
    { content: t('page.home.projectNews.desc1'), id: 1, time: '2021-05-28 22:22:22' },
    { content: t('page.home.projectNews.desc2'), id: 2, time: '2023-10-27 10:24:54' },
    { content: t('page.home.projectNews.desc3'), id: 3, time: '2021-10-31 22:43:12' },
    { content: t('page.home.projectNews.desc4'), id: 4, time: '2022-11-03 20:33:31' },
    { content: t('page.home.projectNews.desc5'), id: 5, time: '2021-11-07 22:45:32' }
  ]);

  const sortByTimeDesc = () => {
    sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  };

  return (
    <ACard
      className="card-wrapper"
      size="small"
      title={t('page.home.projectNews.title')}
      variant="borderless"
      // extra={[
      //   <AButton
      //     key="reset"
      //     type="text"
      //     onClick={reset}
      //   >
      //     Cài lại
      //   </AButton>,
      //   <AButton
      //     key="reverse"
      //     type="text"
      //     onClick={reverse}
      //   >
      //    Đảo ngược
      //   </AButton>,
      //   <AButton
      //     key="sort"
      //     type="text"
      //     onClick={sortByTimeDesc}
      //   >
      //     Sắp xếp theo thời gian
      //   </AButton>,
      //   <AButton
      //     key="unshift"
      //     type="text"
      //     onClick={() => unshift({ content: '我是第一个', id: 1, time: '2021-11-07 22:45:32' })}
      //   >
      //     Thêm từ đầu
      //   </AButton>,
      //   <AButton
      //     key="shift"
      //     type="text"
      //     onClick={shift}
      //   >
      //     Xóa tiêu đề
      //   </AButton>,
      //   <AButton
      //     key="PUSH"
      //     type="text"
      //     onClick={() => push({ content: '我是第六个', id: 6, time: '2021-11-07 22:45:32' })}
      //   >
      //     Thêm tiêu đề
      //   </AButton>,
      //   <AButton
      //     key="pop"
      //     type="text"
      //     onClick={pop}
      //   >
      //     Xóa đuôi
      //   </AButton>,
      //   <a
      //     className="ml-8px text-primary"
      //     key="a"
      //   >
      //     {t('page.home.projectNews.moreNews')}
      //   </a>
      // ]}
    >
      <AnimatePresence mode="popLayout">
        <AList
          dataSource={newses}
          renderItem={item => (
            <motion.div
              layout // Xử lý hiệu ứng sắp xếp như di chuyển lên, di chuyển xuống
              animate="visible" // Trạng thái mục tiêu của hiệu ứng động
              exit="exit" // Hiệu ứng động khi thoát
              initial="hidden" // Trạng thái ban đầu
              key={item.id}
              variants={variants} // Áp dụng các biến thể hiệu ứng động đã định nghĩa
            >
              <AList.Item
                // actions={[
                //   <AButton
                //     key="up"
                //     size="small"
                //     onClick={() => up(item.id)}
                //   >
                //     Di chuyển lên
                //   </AButton>,

                //   <AButton
                //     danger
                //     key="del"
                //     size="small"
                //     onClick={() => remove(item.id)}
                //   >
                //     Xóa
                //   </AButton>,
                //   <AButton
                //     key="down"
                //     size="small"
                //     onClick={() => down(item.id)}
                //   >
                //     Di chuyển xuống
                //   </AButton>
                // ]}
              >
                <AList.Item.Meta
                  avatar={<SoybeanAvatar className="size-48px!" />}
                  description={item.time}
                  title={item.content}
                />
              </AList.Item>
            </motion.div>
          )}
        />
      </AnimatePresence>
    </ACard>
  );
};

export default ProjectNews;
