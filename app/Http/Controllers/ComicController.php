<?php

namespace App\Http\Controllers;

use App\Models\Comic as ModelsComic;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ComicController extends Controller
{
    protected PaymentService $paymentService;
    
    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }
    
    public function show($id)
    {
        info($id);
        $comic = ModelsComic::where('id', $id)
            ->with(['author' => function ($query) {
                $query->select('id', 'name');
            }])
            ->with(['chapters' => function ($query)  {
                $query->withCount('comments');
            }])
            ->with('thumbnail')
            ->with('tags')
            ->firstOrFail();
        // Lấy số dư ví của người dùng
        $walletBalance = 0;
        $user = Auth::user();
        
        if ($user) {
            $walletBalance = $this->paymentService->getWalletBalance($user);
            
            // Kiểm tra và đánh dấu các chapter đã mở khóa
            foreach ($comic->chapters as $chapter) {
                // Thêm thông tin về giá và trạng thái khóa
                $chapter->is_paid_content = $chapter->isPaidContent();
                
                // Nếu đã mua hoặc không cần mua, đánh dấu là đã mở khóa
                if (!$chapter->isPaidContent() || $this->paymentService->hasUserPurchased($user, $chapter)) {
                    $chapter->is_unlocked = true;
                } else {
                    $chapter->is_unlocked = false;
                }
            }
        }

        info($comic->has_vote);
        
        return Inertia::render('Comic/Detail', [
            'comic' => $comic,
            'walletBalance' => $walletBalance
        ]);
    }
}