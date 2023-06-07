<?php

namespace App\Http\Controllers;

use App\Exceptions\IssueException;
use App\Models\Book;
use App\Models\User;
use App\Models\Issue;
use Inertia\Response;
use App\Services\IssueService;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\NewIssueRequest;
use App\Http\Requests\IssueUpdateRequest;

class IssueController extends Controller
{
    public function getIssues(string $query = null): Response
    {
      if($query) {
        $issues = Issue::searchByBookTitle($query)
          ->with(['book', 'user'])
          ->orderBy('returned_at')
          ->paginate(25);
        return inertia('Issues', ['issues' => $issues]);
      }

      $issues = Issue::with(['book', 'user'])->orderBy('returned_at')->paginate(25);
      return inertia('Issues', ['issues' => $issues]);
    }

    public function createIssue(
      User $user,
      Book $book,
      NewIssueRequest $request,
      IssueService $issueService
      ): RedirectResponse
    {
      try {
        $validated = $request->validated();
        $issueService->createIssue($user, $book, $validated);
        return to_route('books')->with('message', [
          'text' => 'Request created successfully. You can pick up the book at the library!',
        ]);
      } catch (IssueException $e) {
        return to_route('books')->with('message', [
          'text' => $e->getMessage(),
          'error' => 1,
        ]);
      }
    }

    public function updateIssue(Issue $issue, IssueUpdateRequest $request, IssueService $issueService): RedirectResponse
    {
      try {
        $validated = $request->validated();
        $issueService->updateIssue($issue, $validated['actionType']);
        return back()->with('message', [
          'text' => 'Request updated successfully!'
        ]);
      } catch (IssueException $e) {
        return back()->with('message', [
          'text' => $e->getMessage(),
          'error' => 1,
        ]);
      }
    }
}
