import {
  getAllTips,
  getTipBySlug,
  createTip,
  updateTip,
  deleteTip,
  getTipsByCategory,
} from '../controllers/disasterTipController.js';

import {
  getUserProgress,
  toggleBookmark,
  toggleChecklistItem,
  saveQuizResult,
  getBookmarkedTips,
  getCompletedItems,
} from '../controllers/userProgressController.js';

import {
  getQuizQuestions,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
} from '../controllers/quizController.js';

import { protect } from '../middleWare/authMiddleware.js';

export function tipsRoutes(router) {
  // Public routes - anyone can view tips
  router.get('/tips', getAllTips);
  router.get('/tips/slug/:slug', getTipBySlug);
  router.get('/tips/category/:category', getTipsByCategory);

  // Protected routes - require authentication
  router.get(
    '/tips/progress',
    protect(['public', 'volunteer']),
    getUserProgress
  );
  router.post(
    '/tips/bookmark',
    protect(['public', 'volunteer']),
    toggleBookmark
  );
  router.get(
    '/tips/bookmarks',
    protect(['public', 'volunteer']),
    getBookmarkedTips
  );
  router.post(
    '/tips/checklist',
    protect(['public', 'volunteer']),
    toggleChecklistItem
  );
  router.get(
    '/tips/completed/:tipId',
    protect(['public', 'volunteer']),
    getCompletedItems
  );

  // Quiz routes
  router.get('/quiz/:category', getQuizQuestions);
  router.post('/quiz/result', protect(['public', 'volunteer']), saveQuizResult);

  // Admin routes - for managing content
  router.post('/tips/create', protect(['admin']), createTip);
  router.put('/tips/update/:id', protect(['admin']), updateTip);
  router.delete('/tips/delete/:id', protect(['admin']), deleteTip);

  router.post('/quiz/create', protect(['admin']), createQuizQuestion);
  router.put('/quiz/update/:id', protect(['admin']), updateQuizQuestion);
  router.delete('/quiz/delete/:id', protect(['admin']), deleteQuizQuestion);
}
